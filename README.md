# lazy student Js
This code reads a file, counts the number of lines in the file, and then downloads the files specified on each line of the file. The progress of the download is displayed in the console with a progress bar.

# Dependencies
This code uses the following dependencies:

- fs - for reading and writing files
- readline - for reading a file line by line
- https - for making HTTP requests

# Usage
To use this code, run the following command in the terminal:
````bash
node app.js <file>
````
Replace <file> with the file that you want to read and download from. The file should contain a list of URLs, with each URL on a new line.

# Example
Let's say, you have a file named urls.txt with the following contents:

````bash
https://www.example1.com/image.png
https://www.example2.com/image2.png
https://www.example3.com/image3.png
````
You can download these images by running the following command:
````bash
node app.js urls.txt
````
The progress of the download will be displayed in the console with a progress bar. When the download is complete, a message will be printed to the console stating "Download complete". The images will be saved in a directory named downloads, with each image given a sequentially numbered file name (e.g. 1.png, 2.png, 3.png).