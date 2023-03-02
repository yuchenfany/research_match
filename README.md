# Goal & Impact
Our project will solve the problem of helping organizations recruit research participants in order to facilitate the quality of academic research. This is an important problem to solve since there is often an issue in research with finding subjects that are interested in participating in research who also fit the criteria of specific research needs. While many organizations may have an existing pool of subjects to draw from, this type of service would allow for the expansion of the data pool that increases the reach of their study. It will also benefit study participants with monetary compensation in return for their time. 

# Features
## User Side
- user creation, login, and secure deletion
- ability to input (optional) demographic, medical, and psychiatric info
- password & all personal & medical information is encrypted on backend
- get studies tailored personal info
- earn compensation for participating in studies

## Researcher Side
- research study creation & deletion
- ability to add specific requirements/filters for the study
- ability to integrate Google Calendar to set specific times for participants
- cost estimation based on # of participants, rarity of requirements, etc.

# How to Run

## Website
cd research-app

npm run build

## Mobile
cd research-mobile-app

npm start


# Code Structure
research-app: contains full-stack impl of website
  -> src 
  
  -> server
  
research-mobile-app: contains full-stack impl of mobile app

  -> src
  
  -> server
