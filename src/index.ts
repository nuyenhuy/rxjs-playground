import {BehaviorSubject, filter, interval, Observable, take, takeUntil} from 'rxjs';
// takeUntil
const _stop: BehaviorSubject<any> = new BehaviorSubject<any>(null);
const stop$ = _stop.asObservable().pipe(filter((v) => v != null));

const now$ = interval(1000).pipe(
    takeUntil(stop$)
).subscribe(value => console.log(value))

setTimeout(() => {
    _stop.next("stop");
}, 10000);

// throttle/throttleTime






