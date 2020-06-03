function signIn(clientId, clientSecret, redirectUri, scope)
{
    let url =
        "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" +
        redirectUri +
        "&prompt=consent&response_type=code&client_id=" +
        clientId +
        "&scope=" +
        scope +
        "&access_type=offline";
    window.location = url;
}

function setTokens(client_id, client_secret, redirect_uri, scope, code) {
    let call = $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) {
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html"); 
        }
  });
}

class Upload
{
    constructor(file)
    {
        this.file = file;
    }
    getName()
    {
        return this.file.name;
    }
    doUpload()
    {
        let formData = new FormData();
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
        return $.ajax({
            type: "POST",
            beforeSend: function (request)
            {
                request.setRequestHeader(
                    "Authorization",
                    "Bearer" + " " + localStorage.getItem("accessToken")
                );
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            uploadType: "media",

            xhr: function () {
                let myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000,
        });
    }
};

function inviaRichiesta(method, url, parameters="") {
    return $.ajax({
        type: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        timeout: 5000
    });
}