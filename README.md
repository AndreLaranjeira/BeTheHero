# BeTheHero

## Description

An app built with node and react that allows NGOs to seek people interested in helping them in certain tasks or cases. Be the hero and help out those in need or support a cause of your interest!

This app was **not my idea.** It follows a tutorial for node and react from the Omnistack week 11, made by [Rocketseat](https://rocketseat.com.br/). The idea, assets and source code for this project were all provided by them, along with the videos teaching me how to make this project. However, certain changes, authored by me, were made to the source code either to improve the project, to challenge myself or because I felt like doing them.

## Project summary

* Backend: Backend API built with node js. Database modeling was done with the `knex` package.
* Frontend: Website frontend made with react. Services api was done with the `axios` package.

## Change summary

#### Backend
* Translated database table and column names from portuguese to english.
* Database tables all have self-incrementing unsigned integers as ids and timestamp columns.
* Added error responses to some of the corner cases of request usage.
* Added a conditional to prevent two NGOs from obtaining the same passkey.

#### Frontend
* Translated website text from portuguese to english.
* Used `.scss` for the stylesheets instead of the regular `.css`.
* Refactored certain css classes to avoid code repetition.

## Licensing

This code was originally made by Rocketseat. It can be found on their [GitHub repository](https://github.com/Rocketseat/semana-omnistack-11) and has the following license:

```
MIT License

Copyright (c) 2020 Rocketseat

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Certain *modifications*, authored by me, were done to the original code. These *modifications* \(**but not the original source code**\) have the following license:

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
```

On the unlikely event you have found this repository and want to use some of the source code in it, it is highly recommended that you include Rocketseat's license for the *original source code*.
