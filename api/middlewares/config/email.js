let jConfig = {
    "host": "tu-host",
    "port": "el-puerto",
    "secure": false,
    "auth": {
        "type": "login",
        "user": "tu-correo@mkt.com",
        "pass": "tu-password"
    }
};

let email = {
    from: "mkt@mkt.com",
    to: "contacto@mkt.com",
    subject: "Nuevo mensaje de usuario",
    html: ` 
        <div> 
        <p>Esto es una prueba</p> 
        </div> 
    `
};

let createTransport = nodemailer.createTransport(jConfig);

createTransport.sendMail(email, function (error, info) {
    if (error) {
        console.log("Error al enviar email");
    } else {
        console.log("Correo enviado correctamente");
    }
    createTransport.close();
});