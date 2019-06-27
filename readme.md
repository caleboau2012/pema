# PEMA

This is an attempted approach to solve the problem of delivering goods from locations based on customers requests.
This is similar to (a variant of) the `Bin Packing Problem`

## Assumptions

- All trailers leave from the warehouse located at stop A
- The warehouse only stores trailers and no commodities are stored at the warehouse from the onset
- There are N number of trailers and drivers
- There are M number of items
- There are X number of stops
- Items are already at some stops and need to be moved to other stops
- Some stops have no items to pick up and are only destinations
- The request for shipping are received a day before and thus the list of items for a day is predefined
- The capacity of every customer item is measured as a box (length _ breadth _ height)
- Trucks attempt to maximize time to deliver and will run the scheduling algorithm to get new items to pick up when they have completed their current journey (TODO)
- We have enough trucks to cover the demand per day if this algorithm can simply maximise truck capacity and minimize time of travel between cities

## Requirements

- A web Form can be used to receive customers requests. This will indiclude
  - Item
  - Pick up location : an assumption above allows us to over look this for now till TODO is completed. (Ran out of time while trying to complete it)
  - dimensions: length, breadth and height
  - Destination: the id of the pickupstop
- Application uses items from logged form to generate schedule (sample of such is generated in code)
- Use a greedy approach to allocate as much luggage to a truck. The most important consideration is time and then filling up the truck to as maximum as possible
- Monitoring app to show the location of each truck at any time and prescribed destination

## Database Design:

- Trailer:

  - id
  - capacity
  - driver_id

- Driver:

  - id
  - name
  - truck_id

- PickUpSpot:

  - id
  - name
  - lat
  - long

- Item:
  - id
  - dimensions
  - destination (pickupspotID)
  - location

## Suggestions for Deployment:

- Database such an Amazon Relational Databases(Amazon RDS) can be used
- A REST API backend written in PHP/Laravel Framework or Javascript , deployed to AWS

## Scaling:

- Shard database by day. This stops legacy data from affecting speed of computation for the current day
- Amazon ElastiCache or Redis can be used for the in memory caching
- Amazon Load Balancer used for distributing traffic requests
- How to scale display of real time location
  - Separate GPS tracking system from display system
  - Let GPS data be pushed to the server and stored in memory (e.g. Redis)
  - Let Mapping application (end user application) query redis for current location and then display to user

## Steps to use this test script

### prerequisites

This POC was built in Nodejs

- clone this application
- run `cd pema`
- If you have nodejs installed, simply run `node index.js`

# TODO

To expand further on this POC

- break the assumption that all items are situated separately from the possible destinations and find a way to dispatch trucks accordingly
  I already started the process but ran out of time - sort original array of items by distance from the warehouse - continously dispatch trailers to stops and greedily pick up items based on already implemented algorithm that minimises distance (to save time) and optimises capacity of the trailer

- show a GUI of truck paths
