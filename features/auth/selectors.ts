import { IAuthState } from './auth.type';
import { authModule } from './constants';

export const selectAuth = (state): IAuthState => state[authModule];
export const selectToken = (state) => selectAuth(state).access_token;
export const selectTokenType = (state) => selectAuth(state).token_type;
export const selectTokenExpire = (state) => selectAuth(state).expiers_in;
