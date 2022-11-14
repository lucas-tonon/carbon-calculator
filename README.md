## Introduction

This project has the goal of simulating a simple Carbon Footprint Calculator. 
A similar (and more complete) example can be seen at [EPA's Calculator Page](https://www3.epa.gov/carbon-footprint-calculator/), in which users can insert their information regarding household, energy consumption, transportation, and waste to calculate their total carbon dioxide emissions, while also allowing the user to discover how they can reduce their emissions.

My version of it tried to focus on using [EPA's Emission Factors Document](https://www.epa.gov/sites/default/files/2021-04/documents/emission-factors_apr2021.pdf) to come up with my own assumptions/formulas. Looking at this document I figured I should attempt to make a calculator that would fit most people use cases, so I looked into electricity consumption, heating consumption (as in fuel used to keep heating at households), and transportation.

I avoided looking into reducing emissions, since it was outside my intended scope and would increase the difficulty of the project.

## Setup

This project was developed using `Node v19.0.1` and `npm v8.19.2`.
To configure your environment locally you simply have to run:

```
# Install dependencies from server and client projects
npm run setup
```

With this you will be all set.

## Execution

This project has a few different scripts to help you do anything that might come up as useful, such as:

| Command | Result |
| ------- | ------ |
| npm run start:client | Run React app located in `app` folder (localhost:3000) |
| npm run start:server | Run Express app located in `server` folder (localhost:3001) |
| npm run start        | Run both apps, with React app proxying the Express app for requests |
| npm run test:client  | Run test cases for front-end app, without watch list (meaning that it will end after running all tests) |
| npm run test:server  | Run test cases for back-end app |
| npm run test         | Run all test cases, from both front-end and back-end, one after another |


It's worth noting that since front-end makes requests to the backend to calculate the total emissions, it might not be that interesting to run the front-end app by itself in most cases.

## Pages

### Home

Simply a descriptive page

![image](https://user-images.githubusercontent.com/37425099/201737611-5e48c0a5-f09c-4751-b904-b3abfd458c6d.png)


### Calculator

Main page, with a global state provided by the App component that keeps track of each input to be used later in the Report page

![image](https://user-images.githubusercontent.com/37425099/201737877-6462000a-dc7e-4018-bc7f-8f1f4ba9bd23.png)
![image](https://user-images.githubusercontent.com/37425099/201737946-c44422b2-61c6-41b4-a443-4f05e7bbb310.png)
![image](https://user-images.githubusercontent.com/37425099/201737816-ad475552-476c-4549-b806-f1a81fcf1cd3.png)

### Report

Shows all emissions from the user separated in categories

![image](https://user-images.githubusercontent.com/37425099/201738069-92cafd8a-df0a-45ab-8661-060852338cdc.png)

## Assumptions

Regarding general assumptions, I chose to use kg of CO2 as the unit of emission instead of lbs given that I wanted to use a more familiar unit for myself.
I thought about creating a simple converter form kg to lbs, but it didn't seem relevant during development.

### Electricity

For electricity we will only be considering California electric grid (CAMX), but this could easily be improved to accept more options.
Since each grid has their own emission factors, it would be interesting to add all options for the U.S.

### Heating

For heating, fuel options were added from what I've seen was most common. In Brazil we don't usually have heating systems in our households so I was not sure what to use, however, after looking a bit into it I decided to filter just a few options that seemed most relevant from the EPA's EF Document.

### Transportation

For transportation I assumed it would be most interesting to keep it focused on users that drive passengers vehicle, such as simple cars.
This could be adapted to accept more options since many people don't own/use cars on a daily basis, but I felt like it would increase the complexity and decided to avoid doing so for now.

## Validations

I tried making as many relevant validations as possible in the front-end and back-end to avoid dealing with error-handling. Form validation is not always that trivial so I decided to restrict what users can input to avoid having to overload them with errors messages splitted in three different pages.

## Next Steps

Having time to do so, it would be interesting to use the validation errors coming as responses from the back-end in our front-end to make validation more clear to end-users. Also, it would be interesting to add information regarding U.S. Averages to help users learn how they are compared to other people.

Another interesting change would possibly be to use Redux/ContextAPI instead of a simple global state. I used a global state for the sake of simplicity, but for an application that could grow with time and have many more categories and such it would be interesting to have a better state tree to keep things more easily manageable.

## References

https://driving-tests.org/beginner-drivers/types-and-grades-of-fuel/

https://www.sperrs.com/your-guide-to-different-types-of-heating-oil/

https://worldpopulationreview.com/country-rankings/electricity-consumption-by-country
