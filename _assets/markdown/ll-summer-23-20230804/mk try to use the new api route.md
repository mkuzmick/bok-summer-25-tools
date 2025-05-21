---
tags: code
---
# mk try to use the new api route

6 min and in of [this tutorial](https://www.youtube.com/watch?v=WlVV_LA4FCg) = good.

## steps

1. create `/src/app/api` folder, then a subfolder with the name of your api route (like `/src/app/api/getthedata` or some such)
2. inside that folder, create a `route.js` file with a simple instantaneous response to check that everything's working so far:
```
export async function GET (request) {
    console.log(`getting a request at /api/getthedata`)
    return new Response('no data yet, but it's coming)
}
```
3. navigate to the route in your browser to make sure it's working (https://localhost:3000/api/getthedata or whatever you called it)
4. do something more complex, like create a `api/[table]/[field]/[value]/route.js` file and throw this in there:

```
import { NextResponse } from "next/server"
import Airtable from "airtable"

const findRecordByValue = async ({ table, field, value, view }) => {
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_SUMMER_23_BASE);
    const theRecords = [];
    await base(table).select({
        maxRecords: 1,
        view: view ? view : "Grid view",
        filterByFormula: `${field}='${value}'`
    }).eachPage(function page(records, next){
        theRecords.push(...records);
        next()
      })
      .catch(err=>{console.error(err); return})
    return theRecords[0];
}


export async function GET(request, context) {
    console.log(`getting a request at /api/airtable`)
    const airtableResult = await findRecordByValue({
        view: "MAIN",
        table: context.params.table,
        field: context.params.field,
        value: context.params.value
    })
    return NextResponse.json({
        text: `your request for a record with ${context.params.field}=${context.params.value}`, 
        parameters: context.params, 
        airtableRecord: airtableResult
    })
}
```
5. or, since this is the summer of AI, maybe something like this?

```

```