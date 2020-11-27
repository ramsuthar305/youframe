module.exports ={
    checkValidType : (filename)=>{
        return (/\.(gif|jpe?g|png)$/i).test(filename)
    }
}