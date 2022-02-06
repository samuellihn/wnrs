module.exports = {
    Main: { 
        displayName: 'Main Deck', 
        decks: require('./mainDeck')},
    Expansions: {
        displayName: 'Expansion', 
        decks: require('./expansion')},
    Self: {
        displayName: 'One Player +', 
        decks: require('./self')},
    Online: {
        displayName: 'Online Released', 
        decks: require('./online')},
    Crossover: {
        displayName: 'Crossover', 
        decks: require('./crossover')},
}