const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
let AthenUser=mongoose.Schema({
    username:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true
    }
});
user=mongoose.model('user',AthenUser);
module.exports=user;
module.exports.register=(username,password)=>{
    return new Promise((resolve,reject)=>{
       return user.findOne({username:username},(err,doc)=>{
        if(err){
            console.log(err)
        }else if(doc){
                reject('le nom utilisateur existe');
            }
            else{
                bcrypt.hash(password,10).then((hpass)=>{
                    let User=new user({
                        username:username, 
                        password:hpass,
                     });
                    
                    User.save().then((doc)=>{
                        resolve(doc);
                    }).catch((err)=>{
                        reject(err);
                    })
                }).catch((err)=>{
                    reject(err);
                })
            }
        })
    })
}
var privatkey="secretkey:§%$%$ZDFH%%&Ä'Ä?)???§§FGE%"
module.exports.login=(username,password)=>{
    return new Promise((resolve,reject)=>{
        return user.findOne({username:username},(err,user)=>{
            if(err){
                console.log(err)
            }
            else if(!user){
                    reject("nous n'avons pas ce nom d'utilisateur")
                }else{
                    bcrypt.compare(password,user.password).then((same)=>{
                        if(same){
                            //send token
                            let token=jwt.sign({
                                id:user._id,
                                username:user.username
                            },privatkey,{
                                expiresIn:'3h'
                            })
                            resolve(token);
                        
                        }else{
                            reject('Mot de passe incorrect')
                        }
                }).catch((err)=>{
                    reject(err);
                })
            }
        })
        
    })
}

