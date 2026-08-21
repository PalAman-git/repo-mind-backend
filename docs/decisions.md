## why Nest Js?
As I already worked with javascript and typescript and have experience with express js , so I chose this so that I could work with the environment I already worked with.

## Why I chose Semantic chunking over AI based Chunking
- my app analyzes the code, so functions inside the code give me clear boundaries to do the chunking.
- It is very cost effective for me.
- It preserves the semantic meaning of the code block , instead of arbitrary fixed size chunking of 100 lines of code.

## Drawback of Semantic chunking
- I need language specific parsers.
- ingestion pipeline could get complex.
- some languages may have different structure that I would need to read.

Thinking of using Factory and Strategy pattern for different parsers.

```
ParserFactory
|
|- Typescript Parser
|- Javascript Parser
|- C++ Parser
|- Python Parser
```


