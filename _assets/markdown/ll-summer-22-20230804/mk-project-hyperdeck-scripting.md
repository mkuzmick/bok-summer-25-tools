---
tags: mk, project, ontology
---

# mk-project-hyperdeck-scripting

- open telnet connection
- send text-based commands


## command formats

Simple command:
```
command

200 ok
```

Command with Parameters:

```
command
parameter 1: value
parameter 2: value

200 ok
```

Command with Response

```
command

211 response:
response 1: value
```

## basics


### format drive
```
telnet xxx.xxx.xxx.xxx 9993

format: prepare: HFS+
```

it will respond with a token

```
216 format ready:
token
```

then type
```
format: confirm: token
```

### record

```
telnet xxx.xxx.xxx.xxx 9993
