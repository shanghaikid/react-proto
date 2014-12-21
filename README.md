react-proto
===========

1. npm install
2. npm start


flux
===========
* component -> add store change listener -> onChange -> update component state/props
* store -> register payload callback  -> onDispatch -> dosomething -> emit change event
* view -> doAction(send payload(data))
* action -> dispatch paylooad