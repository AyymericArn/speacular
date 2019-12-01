import User from './IUser';
import Quote from './IQuote';
import Mood from './IMood';

export default interface State {
    moods: Mood[];
    user: User;
    readQuotes: Quote[];
}
