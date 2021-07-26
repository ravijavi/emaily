module.exports = survey => {
    // return '<div>' + survey.body + '</div>';
    //this was just a test, now we will make a better one
    return `
   <html>
   <body>
       <div style="text-align: center;">
           <h3>I'd like your input!</h3>
           <p>Please answer the following question:</p>
           <p>${survey.body}</p>
           <div>
            <a href:"https://www.google.com">Yes</a>
           </div>
           <div>
            <a href:"http://localhost:3000">No</a>
       </div>
       </div>
   </body>
   </html>
   `;
};