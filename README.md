# bar-book
MongoDB, Express, REACT, Node, react-bootstrap

## WORK IN PROGRESS
Intended for use on mobile!

Test deploy: https://bar-book.herokuapp.com/

```
AS A novice bartender
I WANT to be able to look up drink recipes
SO THAT I can mix drinks requested by bar patrons in a timely manner.
```

## COMPLETE
* Back-end: schemas, queries, mutations
* basic navbar with icons for mobile use
* Home Page shows most recent unique drinks added to the db for convenience (1st nav bar icon)
    * drinks are added to the db when the SingleDrink page is visited for the first time (all API recipes must be visited at least once before users can comment, submit recipe variations, add to a bar-book, etc.)
* Search Page allows search drink recipes by querying db ~~(2nd nav bar icon)
    * tap the drink from the search results to view full recipe and add drink to history
* user authentication (for create drinks, add comment, add friend, compile a bar-book)
* move search input to a fixed position on top of screen - so that begin searching requires 1 tap instead of 2
* refactor to make all drinks the same format 
    * first I combed thru entire API recipe library to use as seeds
    * remove "alternateId" from Drink schema
* Home page shows recently viewed drinks (up to 15) - from local storage
* user can create new drinks from scratch (3rd nav bar icon)

## TODO
* beautify create new drinks page, add validation
* user can add various filters to their search

* user submitted drink recipes must have unique name, otherwise it is suggested to submit drink as a variation instead:
* user can submit variations on drink recipes
    * belongs to other drinks in the db, add an attribute for all drinks: ```hasVariations: [Drink]```
    * include view drink variations via bootstrap accordion component in SingleDrink, contains a DrinkList component when expanded
* user can add recipes to one or more personal "bar book" (4th nav bar icon, like playlists)
* measurement standardization
    * util function to filter all measurements and convert liter, centiliter, juice of 1 lime, 1 cube sugar, 1 tsp sugar, etc. to standard oz measurements
* user can search for other users and add as friends
* user can commment on drink recipes, comments appear under view variations bootstrap accordion

## Nice to have
* first time logging in? Display one-time-only brief slide-show of screenshots demonstrating app usage
* a rating system for recipes
* DrinkList - previews of drinks should have responsive height relative to number of ingredients