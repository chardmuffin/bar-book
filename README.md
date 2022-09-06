# bar-book
MongoDB, Express, REACT, Node, react-bootstrap

## WORK IN PROGRESS
Intended for use on mobile!

Test deploy: https://bar-book.herokuapp.com/


AS A novice bartender
I WANT to be able to look up drink recipes
SO THAT I can mix drinks requested by bar patrons in a timely manner.


## COMPLETE
* Back-end: schemas, queries, mutations
* basic navbar with icons for mobile use
* Home Page shows most recent unique drinks added to the db for convenience (1st nav bar icon)
    * drinks are added to the db when the SingleDrink page is visited for the first time (all API recipes must be visited at least once before users can comment, submit recipe variations, add to a bar-book, etc.)
* Search Page allows search drink recipes by fetching TheCocktailDB.com API ~~(2nd nav bar icon)
    * tap the drink from the search results to view full recipe and trigger addDrink to the DB. API search results are NOT all automatically added to the DB!
* user authentication (for create drinks, add comment, add friend, compile a bar-book)
* move search input to a fixed position on top of screen - so that begin searching requires 1 tap instead of 2

## TODO
* refactor to make all drinks the same format 
    * first I comb thru entire API recipe library to use as seeds
    * remove "alternateId" from Drink schema
    * measurement standardization
        * util function to filter all measurements and convert liter, centiliter, juice of 1 lime, 1 cube sugar, 1 tsp sugar, etc. to standard oz measurements
* user can create new drinks from scratch (3rd nav bar icon)
    * user submitted drink recipes must have unique name, otherwise it is suggested to submit drink as a variation instead:
* user can submit variations on drink recipes (i.e. SingleDrink main recipe page has "variations" tab to show/add user submissions - recipe versions)
    * these will be different than normal "drinks" in the db (all share same name and potentially alternateId)
* user can add recipes to one or more personal "bar book" (4th nav bar icon, like playlists)
* user can filter search by user-submitted drinks
* user can search for other users and add as friends
* user can commment on drink recipes
* replace Home Page results logic
    * currently, drinks on home page are those most recently added across the entire DB. This will be useless if there are lots of users.
    * include an attribute "history" under User schema to use for home page. History will be an array of the 20 last visited SingleDrink drinks.

## Nice to have
* first time logging in? Display one-time-only brief slide-show of screenshots demonstrating app usage
* a rating system for recipes
