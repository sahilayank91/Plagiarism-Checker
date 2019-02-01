= require('fs-readfile-promise');

//For command line arguments
// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);
var sub = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";


var text = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

var copy = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";


var dirname='/home/sahil/2015/';
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
     // onError(err);
    
      return;
    }
    console.log(filenames);
    
    var plagiarismList = [];
    filenames.forEach(function(file){
        
        var text = fs.readFileSync(dirname + file,'utf-8');
        console.log("Running for ",file);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        var val = 0;
        filenames.forEach(function(filename) {  
              if(file==filename){
                return;
              }     
              fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                // onError(err);
                  return;
                }
                var value = plagiarismChecker(content,text);
                if(value > val ){
                  val = value;
                  console.log(val);
                }

console.log(val);
              });
            });   
            
            
    })
   
  });
}




var plagiarismChecker = function (sub, text,flag) {
            var wordsA = sub.split(" ");
            var wordsB = text.split(" ");

          console.log(sub);
          console.log(text);


            if (wordsB.length < 4 || wordsA.length < 4) {
                return 0;
            }
            //creating the set of the array so formed
            var setA = new Set(wordsA);
            var setB = new Set(wordsB);
            //finding the intersection
            var intersection = new Set([...setA].filter(x => setB.has(x)));
            var inter;
            if(flag === 1){
                 inter = (Number)(intersection.size) / setA.size;
            }else{
                 inter = (Number)(intersection.size) / setB.size;
            }
            if (inter < 0.25) {
                return inter;	
            }

            //Initiating Sequence matching algorithm
            var s = new difflib.SequenceMatcher(null, sub, text);
            var value = (s.ratio() > inter) ? s.ratio() : inter;
            return value;
    };

// var cval = plagiarismChecker(sub,copy);
readFiles(dirname);
// readFiles(dirname);
// console.log("The similarity between statements is:",cval);
