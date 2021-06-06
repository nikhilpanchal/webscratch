import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/takeUntil'

const { Observable, fromEvent } = require('rxjs')

const observable = new Observable((subscriber) => {
  let counter = 0
  subscriber.next(counter)

  const interval = setInterval(() => {
    counter++
    subscriber.next(counter)

    if (counter === 5) {
      subscriber.complete()
      clearInterval(interval)
    }
  }, 1000)
})

observable.subscribe((value) => {
  console.log({ value })
},
null,
() => {
  console.log('Done!')
})

export function dragAndDropObservable (item, container) {
  const spriteMouseDowns = fromEvent(item, 'mousedown')
  const spriteContainerMouseMoves = fromEvent(container, 'mousemove')
  const spriteContainerMouseUps = fromEvent(container, 'mouseup')

  const spriteMouseDrags =
      // for every mouse move on the sprite
      spriteMouseDowns.concatMap(function contactPoint () {
        return (
          spriteContainerMouseMoves.takeUntil(spriteContainerMouseUps)
        )
      })

  return spriteMouseDrags
}

// Subscribing to the drag and drop stream
const item = document.getElementById('item')
const container = document.getElementById('container')

const observableItem = dragAndDropObservable(item, container)

// For each mouse drag event, move the sprite to the absolute page position.
observableItem.subscribe(function (dragPoint) {
  // Will be called as long there is a stream of events published on the observable
  item.style.left = dragPoint.pageX + 'px'
  item.style.top = dragPoint.pageY + 'px'
})
