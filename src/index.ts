import {
    BehaviorSubject,
    debounce,
    debounceTime,
    filter,
    forkJoin,
    from,
    fromEvent,
    interval,
    Observable,
    of,
    Subscription,
    take,
    timer,
    takeUntil,
    throttleTime,
    throwError,
    max,
    map,
    combineLatest,
    zip,
    concat,
    delay,
    merge,
    race,
    withLatestFrom,
    startWith,
    catchError, retry, defaultIfEmpty, switchMap, tap, mergeMap, concatMap, exhaustMap, timeInterval, delayWhen, timeout
} from 'rxjs';

// forkJoin

// const wait$ = interval(200).pipe(take(5)); // Phát ra 5 giá trị (0,1,2,3,4), rồi hoàn thành
//
// forkJoin([
//     of(1, 2, 3, 4),      // Hoàn thành ngay lập tức
//     from([5, 6, 7, 8]),  // Hoàn thành ngay lập tức
//     wait$,                // Mất 5 giây để hoàn thành
// ], ((x: number, y: number, z: number) => {
//     return {
//         x: x,
//         y: y,
//         z: z
//     }
// })).subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("co loi", error),
//     complete: () => console.log('fork join Complete')
// });
//
// //
//
// interval(1000).pipe(
//     take(5),
//     map((value) => value+1)
// )
//     .subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('Complete')
// })

// combineLatest([
//     timer(1000, 1000).pipe(take(3)),
//     timer(1000, 7000).pipe(take(3))
// ]).subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('Complete')
// })


// zip(
//     timer(1000, 1000).pipe(take(3)),
//     timer(1000, 7000).pipe(take(3))
// ).subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("co loi", error),
//     complete: () => console.log('Complete')
// })


// concat(of([1, 2, 3]).pipe(delay(1000)), of([3, 4, 5]).pipe(delay(1000)), of([5,6,7]).pipe(delay(1000))).subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("co loi", error),
//     complete: () => console.log('Complete')
// });

// merge(of(4, 5, 6).pipe(delay(5000)), of(1, 2, 3), of(2), throwError('error')).subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("co loi", error),
//     complete: () => console.log('Complete')
// });
// output:
// 1,2,3
// sau 1s: 4,5,6
// output: 'complete'


// // takeUntil
// const _stop: BehaviorSubject<any> = new BehaviorSubject<any>(null);
// const stop$ = _stop.asObservable().pipe(filter((v) => v != null));
// const takeUntil$: Subscription = interval(1000)
//     .pipe(takeUntil(stop$))
//     .subscribe(value => console.log(value))
// setTimeout(() => {_stop.next("stop");}, 10000);
//
// // throttle/throttleTime
// const throttle$: Subscription = interval(1000)
//     .pipe(throttleTime(2000))
//     .subscribe(value => console.log(value))
// const throttleTime$ = interval(1000)
//     .pipe(throttleTime(2000))
//     .subscribe(value => console.log(value))
//
// // takeUntil
// const button = document.getElementById("existButton");
// const clickStream$ = fromEvent(button, 'click');
// interval(1000)
//     .pipe(takeUntil(clickStream$))
//     .subscribe((value) => {console.log(value);});
//
// const input = document.getElementById('keyword');
// const input$ = fromEvent(input, 'input');
//
// input$.pipe(debounceTime(2000)).subscribe(value => {
//     console.log((value.target as HTMLInputElement).value);
// })

// const clickEvent = document.getElementById('existButton');
// const click$ = fromEvent(clickEvent, 'click');
//
// click$.pipe(
//     startWith('start'),
//     withLatestFrom(interval(0).pipe(startWith(-1), take(5)))
// ).subscribe(value => console.log(value))

// of(1, 2, 3,4, 5).pipe(
//     map((value) =>  {
//         if (value == 2)  throw new Error('error')
//         else return value
//     }),
//     retry(5),
//     // catchError((err, caught) => of(err))
// ).subscribe(value => {
//     console.log(value)
// })
//

// const clickEvent = document.getElementById('existButton');
// const clickEvent$ = fromEvent(clickEvent, 'click');

// clickEvent$.pipe(
//     takeUntil(timer(5000)),
//     defaultIfEmpty('unclick'),
//     take(1)
// ).subscribe({
//     next: (value) => {
//         if (value == 'unclick') {
//             console.log('Chua click')
//         } else {
//             console.log('Da click')
//         }
//     },
//     complete: () => console.log('Complete')
// });

// clickEvent$.pipe(
//     throttleTime(2000),
//     tap((key) => console.log(key)),
//     switchMap((key) => {
//         return interval(1000).pipe(
//             map(value =>  [key, value]),
//             take(1000)
//         )
//     })
// ).subscribe(value =>  {
//     console.log(value)
// })

// clickEvent$.pipe(
//     mergeMap((key) => {
//         return interval(1000).pipe(
//             map(value =>  [key, value]),
//             take(1000)
//         )
//     })
// ).subscribe(value => console.log(value));

// clickEvent$.pipe(
//     exhaustMap((value) => interval(1000).pipe(take(5)))
// ).subscribe(value => console.log(value));

// clickEvent$.pipe(
//     timeInterval(),
//     map((value) => {
//         return value.interval/1000 + ' second'
//     }),
// ).subscribe(console.log);
//
// of(1, 2, 3, 4).pipe(
//     delayWhen((value) => clickEvent$)
// ).subscribe(console.log);

// clickEvent$.pipe(
//     timeout(10000)
// ).subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log('timeout'),
//     complete: () => console.log('complete')
// })