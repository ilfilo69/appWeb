class FileSistem {

  static SaveImage = async (username,image,newImage) => {
      let response = await fetch(`/saveImage`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,image,newImage}),
      })
      if(response.ok)
      {
          const res = await response.json();
          console.log(res);
          return res;
      }
    
  }

  static SaveNews= async (month,desc,text)=>
  {
    let response = await fetch(`/savefile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({month,desc,text}),
    })
    if(response.ok)
    {
        const res = await response.json();
        console.log(res);
        return res;
    }
    
  }

  static SaveImageOpera = async(id,image,newImage,title)=>{
    let response = await fetch(`/saveImageOpera`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,image,newImage,title}),
    })
    if(response.ok)
    {
        const res = await response.json();
        console.log(res);
        return res;
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.errors;
        }
        catch (err) {
            if (Array.isArray(err)) {
                let er = '';
                err.forEach((e, i) => er += `${e.msg}`);
                throw `Error: ${er}`
            }
            else {
                throw 'Error cannot parse server response';
            }
        }

    }
  }
}

export default FileSistem;