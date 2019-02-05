import React, { Component } from 'react'
import axios from 'axios';
import './css/mealplan.scss'
import ShowMeals from './ShowMeals'

class UserSessions extends Component {
  state = {
    dayOneBtn: true,
    dayTwoBtn: true,
    dayThreeBtn: true,
    dayFourBtn: true,
    dayFiveBtn: true,
    daySixBtn: true,
    daySevenBtn: true
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/user/users/${id}`, config)
      .then(resp => {
        return this.setState({mealPlan: resp.data.mealPlans[resp.data.mealPlans.length - 1]})})
      .catch(err => {
        console.log(err.response)
        if(!err.response) return console.log(err)
        if(err.response.status === 404) this.props.history.replace('/')
      });
  }

  showMeals = (dayNum) => {
    const {mealPlan} = this.state
    const day = `day${dayNum}`
    // console.log(mealPlan[day])
    this.setState({showMealPlan: <ShowMeals meals={mealPlan[day]}/>, addMealBtn: false})
  }

  render() {
    const {mealPlan, dayOneBtn, dayTwoBtn, dayThreeBtn, dayFourBtn, dayFiveBtn, daySixBtn, daySevenBtn, showMealPlan } = this.state;
    if(!mealPlan) return (
      <div className="background" id="meal-plan">
        <div className="main-container">
          <div className="content-container">
            <h1>There is no meal plan</h1>
            <button onClick={() => this.props.history.goBack()}>back</button>
          </div>
        </div>
      </div>
    )
    return (
      <div className="background" id="meal-plan">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="mealplan-content-container">
              <h1>Meal Plan</h1>
              <div className="btn-container">
                { dayOneBtn && <button onClick={() => this.showMeals(1)}>Day 1</button>}
                { dayTwoBtn && <button onClick={() => this.showMeals(2)}>Day 2</button>}
                { dayThreeBtn && <button onClick={() => this.showMeals(3)}>Day 3</button>}
                { dayFourBtn && <button onClick={() => this.showMeals(4)}>Day 4</button>}
                { dayFiveBtn && <button onClick={() => this.showMeals(5)}>Day 5</button>}
                { daySixBtn && <button onClick={() => this.showMeals(6)}>Day 6</button>}
                { daySevenBtn && <button onClick={() => this.showMeals(7)}>Day 7</button>}
                { showMealPlan && <>{showMealPlan}</>}
              </div>
            </div>
          </div>
      </div>
    )
  }  
}

export default UserSessions;