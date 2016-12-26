import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

export function SetsState(prop?: string) {
    return function(target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            set: function (value: any) {
                let val = this["___" + propertyKey] = value;
                let subscription = this["___" + propertyKey + "_sub"];
                if (subscription) {
                    subscription.unsubscribe();
                }

                let unmounted$ = this.unmounted$ = this.unmounted$ || new Subject<any>();
                if (this.componentWillUnmount) {
                    let origUnmount = this.componentWillUnmount;
                    let that = this;
                    this.componentWillUnmount = function() {
                        that.unmounted$.next(true);
                        origUnmount.call(that);
                    }
                } else {
                    this.componentWillUnmount = function() {
                        unmounted$.next(true);
                    }
                }

                let stream$ = val
                    .takeUntil(unmounted$)
                    .distinctUntilChanged()
                    .do(propVal => prop ? this.setState({[prop]: propVal}) : this.setState(propVal));

                const makeSub = () => {
                    this["___" + propertyKey + "_sub"] = stream$
                        .catch(() => stream$)
                        .subscribe();
                };

                if (!this._unmounted) {
                    makeSub();
                } else if (this.componentDidMount) {
                    let origMount = this.componentDidMount;
                    let that = this;
                    this.componentDidMount = function() {
                        makeSub();
                        origMount.call(that);
                    }
                } else {
                    this.componentDidMount = makeSub
                }
            },
            get: function (): any {
                return this["___" + propertyKey];
            },
            enumerable: true,
            configurable: true
        });
    }
}