# THE AV NETWORK

link to [spring 2020 signal network spreadsheet](https://docs.google.com/spreadsheets/d/1YSYOf0nkuvIaoESPbCnxT981co4_ejC0z43Y-2gGAJU/edit#gid=173972214)

## THE SYSTEM

just sketches for now. 


### MAIN TABLE CONCEPT

the main table should be interconnected, with two ATEMs connected to each other and to two computers, and with this whole system getting 4+ feeds back from the **a8k.a** or **hub.a**.

* sources
    * main table
        * 2x computer HDMI-outs
            * split under table 1x4 and sent to both ATEMs and monitors
        * 2x overhead SDI-outs
            * sent back to Constellation
        * 4x overhead XLR-outs
            * sent back to C200s
        * 1x AMX pgm feed HDMI-out
            * split and sent to am.a and converted and sent to a8k.a
    * camera position
        * 8x Constellation outs
        * 4x Camera SDI-outs (to Constellation)
        * 
* destinations
    * main table
        * 8x AMX HDMI-ins
            * get 2x HDMI direct from overheads
            * get 2x HDMI direct from computer feeds split
            * get 4x from the Constellation, converted SDI => HDMI under table or above truss
        * 4x AM HDMI-ins
            * pgm from AMX
            * pgm from Constellation
            * computer 1
            * computer 2
        * 2x computer usb-ins
            * get one from AMX
            * get one from AM
    * camera position
        * 1x confidence monitor HDMI-in
        * 2x display monitor HDMI-ins
        * 12x Constellation SDI-ins
        * 4x main camera XLR-ins
        * think about adding a mixer and multitrack recorder
* far wall
    * 5x screens
        * sdi2hdmi converters on the wall


### AIRTABLE SCHEMA

[The Airtable in progress lives here.](https://airtable.com/tblQhCyZzf5liD2tS/viwNHBYNrt5z8oM7v?blocks=hide) But let's outline the basic schema here.

* CONNECTIONS
    * from (links to OUTS)
    * lookup from source device
    * to (links to INS)
    * lookup to source device
    * cable (links to CABLES)
    * signal
    * modified
* INS
    * device (links to DEVICES)
    * port number
    * connectorType
* OUTS
    * device (links to DEVICES)
    * port number
    * connectorType
* CABLES
    * id
    * connectorType
    * cableType
    * color
    * length
* DEVICES
    * make
    * model
    * id
    * manual link
    * type
    * location

Notes:

* studio@xyz needs to be on this airtable
* we should check connections routinely using last modified (i.e. at weekly or monthly intervals, depending on the location)
* in the connections table, have a view that groups by source device and another that groups by destination device
* the goal of cable type (and color for that matter) is easier identification when labels disappear or midway through a run
* 

### THE ELEMENTS LISTED

what are the elements

**HUBS, SPLITTERS AND SWITCHERS**
* ATEM ME 4K
* VIDEO HUB
* ATEM CONSTELLATION 8K 
* ATEM MINI EXTREME ISO 1
* ATEM MINI EXTREME ISO 2
* ATEM MINI EXTREME ISO 3
* ATEM MINI 1
* ATEM MINI 2
* ATEM MINI 3
* ATEM MINI 4

**CAMERAS**
* C200.a
* C200.b
* C200.c
* C200.d
* BGH1.a
* BGH1.b
* ZCAM.a
* 5D4.a
* 5D4.b
* 5D3.a
* 5D3.b
* BMSC.a
* BMSC.b
* BMSC.c
* BMMSC.a
* BMMSC.b
* BMMSC.c
* BMMSC.d
* BMMSC.e
* GH4.a
* GH4.b
* GH4.c
* GH5.a
* GH3.a

**PERFORMANCE LOCATIONS**
* LL Studio: main table
* LL Studio: 

## NOTES


### SOME GEAR TO CHECK OUT

* Decimator [4x4 SDI to HDMI converter](https://www.decimator.com/Products/MultiViewers/DMON-4S%20MultiViewer/DMON-4S.html)
* 