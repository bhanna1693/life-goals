import { Response } from '@angular/http';
import { GoalService } from './services/goal.services';
import Goal from './models/goal.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //Private goalService will be injected into the component by Angular Dependency Injector
  constructor(private goalService: GoalService) { }

  //Declaring the new goal Object and initilizing it
  public newGoal: Goal = new Goal()

  //An Empty list for the visible goal list
  goalsList: Goal[];
  editGoals: Goal[] = [];


  ngOnInit(): void {

    //At component initialization the 
    this.goalService.getGoals()
      .subscribe(goals => {
        //assign the goalList property to the proper http response
        this.goalsList = goals
        console.log(goals)
      })
  }

  //This method will get called on Create button event
  create() {
    this.goalService.createGoal(this.newGoal)
      .subscribe((res) => {
        this.goalsList.push(res.data)
        this.newGoal = new Goal()
      })
  }

  editGoal(goal: Goal) {
    console.log('made it here')
    console.log(goal)
    if (this.goalsList.includes(goal)) {
      if (!this.editGoals.includes(goal)) {
        this.editGoals.push(goal)
      } else {
        this.editGoals.splice(this.editGoals.indexOf(goal), 1)
        this.goalService.editGoal(goal).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editGoal(goal)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitGoal(event, goal: Goal) {
    if (event.keyCode == 13) {
      this.editGoal(goal)
    }
  }

  doneGoal(goal: Goal) {
    goal.status = 'Done'
    this.goalService.editGoal(goal)
      .subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editGoal(goal)
        console.error('Update Unsuccesful')
      })
  }

  deleteGoal(goal: Goal) {
    this.goalService.deleteGoal(goal._id)
      .subscribe(res => {
        this.goalsList.splice(this.goalsList.indexOf(goal), 1);
    })
  }
}