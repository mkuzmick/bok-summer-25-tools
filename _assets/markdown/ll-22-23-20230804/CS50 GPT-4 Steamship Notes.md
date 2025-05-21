# CS50 GPT-4 Steamship Notes 
---

# [steamship](https://www.steamship.com/build)

- [hackathon for building](https://www.steamship.com/hackathon/harvard) and deploying an ai bot 

## agenda

- what is chatGPT?
- How are people building with it?

## what is chatGPT

- terms: 
    - large language models 
    - universal approximators 
    - generative ai 
    - simulator 
    - content generator
    - transformer
    - neural network
    - agent 
    - simulator 
    - transformer

### language model description 
    - produces a probabaility dist. over some vocabulary 
        - patterns, essentially
            - what follows "I am?" 
            - vocabulary = all words 
            - can sample predicted word repeatedly to generate text 
            
    - natural language as an interface
        - dependable in/output is hard
        - OpenAI InstructGPT (2022)
            - led to chatGPT-4
                - trained on the internet
                - then improved with responses
    - integration 
        - with API and other integration tools, GPT is learning more and improving itself 
            - self-improving 

## how are people building AI apps 

- "what could you do if you could script computation over and over again in the ways computers could do?"
- common GPT apps: 
    - companionship 
    - question answering 
    - utility 
        - productivity 
    - creativty 
        - image and text generation 
- experimental 
    - "baby AGI"
        - self directed AI 
            - multi-step task agents
            - hyper-personalization 


### examples 
    
#### companionship app 
    - personality 
    - tools
        - Chinese idioms 
            - gives examples to the AI of the personality type 
            - then gives it access to information ot produce
    - you don't require coding experience. with a smlall amount of manipulation, the AI can run itself 

#### question answering 
    - customer service bots with much more flexibility and access to knowledge 
        - take all the documents you would want an AI to know 
            - cut them up by pulling fragments of texts, turn them into embedding vectors
                - ex. key word + one data point 
            - create a vector database 
            - train the AI on the personality you want it to answer with 
                - You are an expert at answering questions. Please answer <question> using this database <vector database>
    
    
- the new needed skill: 
    - very creative, tactical rearrangement of prompts and putting them into an algorithm 
    
- A bot to assign tasks on airtable to people in the office? 
    
    
#### utility functions 
    - low hanging fruits- automate takss that require basic language understanding to perform 
        - generate a unity test for this function 
        - scrape and summarize this website 
        - tell me which Tweets to read 
    - incredible startup & personal project potential 
    
#### creativity 
- writing atlas example 
    - you can type in a type of story you like (I wonder how well you need to promopt here, a la mid journey)
        - generates a suggestion list 
            - "why the AI thinks you'll like it" 
            - "AI think you'll like this location"
            - "AI's estimate of audience"
            - "AI's estimate of topic"
    *                 lines 174-203 on github 
                
                

---



### BabyAGI/AutoGPT

1. Person: "build a company"
2. GPT: "generate steps to build a company"
3. GPT: performs each step
4. RESULT: output of final step
    - python loses importance, as this requires so little code 
    - this is all about prompt engineering 


AGENT: GPT + some bigger body in which is lives 
* body could be personality or tools

TOOLS: objectives and the access to things that allow it to complete those objectives. 


---


### Q&A

- how to reduce "hallucinations"
    - the way in which it synthesizes, is the same way it "hallucinates"
        - similar to humans being incorrect 
    - give examples to solve accute hallucinations 
    - or fine-tune on a specific domain of knowledge 
    - IT ONLY UNDERSTANDS THINGS THROUGH LANGUAGE 
        - "like a child who learned english in a gray, windowless box"
            - "it knows about the world, but has no idea how to confirm"
        - ask it to say "my best guess is"
            - reduces hallucinations 
        - for domain-specific knowledge, you'll need to provide it with an approved datatbase 
            - this database must have vectors and language as a base 

- the instructions that create personality "you are [blank]"
    - how does it work?
        - alas, it's because it "tends to work"
            - essentially, this is how we talk to one another, as personaliies are based in language 
                - as chatGPT has absorbed so much language, it can idenitfy personality patterns




- generalized issues: 
    - hallucinations/wrong answers:
        - give examples 
        - refine the prompt
            - "much of this is magic incantation"
    - domain specializations
        - refining the vectors and prompts


    
    




