import Goal from '../models/goal.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class GoalService {

    api_url = 'http://localhost:3000';
    goalUrl = `${this.api_url}/api/goal`;

    constructor(private http: HttpClient) { }


    //Create goal, takes a Goal Object
    createGoal(goal: Goal): Observable<any> {
        //returns the observable of http post request 
        return this.http.post(`${this.goalUrl}`, goal);
    }


    //Read goal, takes no arguments
    getGoals(): Observable<Goal[]> {
        return this.http.get(this.goalUrl)
            .pipe(map(res => {
                //Maps the response object sent from the server

                return res["data"].docs as Goal[];
            }))
    }


    //Update goal, takes a Goal Object as parameter
    editGoal(goal: Goal) {
        let editUrl = `${this.goalUrl}`
        //returns the observable of http put request 
        return this.http.put(editUrl, goal);
    }

    //Delete the object by the id
    deleteGoal(id: string): any {
        let deleteUrl = `${this.goalUrl}/${id}`
        return this.http.delete(deleteUrl)
            .pipe(map(res => {
                return res;
            }))
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        // for demo purposes only
        return Promise.reject(error.message || error);
    }



}