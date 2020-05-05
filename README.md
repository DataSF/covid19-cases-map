# Albers USA state-level data visualization

This example builds on the [Albers projection style blog post](https://www.mapbox.com/elections/albers-usa-projection-style). You can [add the Albers style to your account](https://account.mapbox.com/auth/signin/?route-to=https://studio.mapbox.com/styles/add-style/lobenichou/ck6mlwzti0xkq1ipl6zxkblyz) to .

This directory contains example code for visualizing state-level data.

The `index.html` file shows how to style a map based on data loaded from a CSV. You can replace the usage of `mock-states.csv` in the index file to point to a CSV file with the same shape that is hosted elsewhere.

If your data is shaped differently, you can describe it when calling `loadCSV`. Each key in the object passed as the second argument used as the name in code and the value strings should match a column in your CSV.

e.g.
`loadCSV( "filename.csv", { special: "some value" })`
will load the "some value" column of a CSV to an array of objects with that value stored as the "special" attribute.

## Production files
- index.html: the main display file and user interaction code
- mock-states.csv: epidemiology data (can be replaced by pointing the stateLevelDataURL to a new location)

`// TODO` comments in the code indicate places where you should update information to match your production system.

## Development files
To make development easier and test that the code is reliable, we have a few extra files in this directory. We use the javascript development tool [yarn](https://classic.yarnpkg.com/en/docs/install/) to interact with them.

## Running locally

Install the node dependencies for testing and serving our files:

```
yarn install
```

Start a server where you can view the index.html page:
```
yarn start
```

You should now be able to see the sample map at [localhost:8080](http://localhost:8080).

If you don't see a map, make sure you have added your access token in index.html.
