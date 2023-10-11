import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private readonly _httpClient = inject(HttpClient);
    private readonly _userService = inject(UserService);

    constructor(
        @Inject('environment') private environment,
    ) { }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { username: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
        return of(null).pipe(
            catchError(() => throwError('User is already logged in.'))
        );
    }

        return this._httpClient.post(`${this.environment.baseUrl}/auth/login`, credentials).pipe(
            tap((response: any) => {
                if (response.error?.status === 400 && response.error?.detail === "Bad credentials") {
                    throw new Error('Invalid username or password.');
                }
            }),
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
            catchError((error: any) => {
                return throwError(() => new Error('An error occurred.'));
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.accessToken}`
            })
        };

        return this._httpClient.get(`${this.environment.baseUrl}/auth/getUserByToken`, httpOptions).pipe(
            catchError(() => {
                return of(false);
            }),
            switchMap((response: any) => {
                this._authenticated = true;

                this._userService.user = response;

                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post(`${this.environment.baseUrl}/auth/sign-up`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
