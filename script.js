let continar1 = document.createElement('div');
continar1.classList.add('continar');
continar1.style.backgroundColor = "blue"
continar1.innerHTML = `<p style="text-align:center; color:red;font-size:30px;padding:15px;margion:10px " >ICE AND FIRE</p>`
document.body.appendChild(continar1);
async function book() {
  let bookapi = fetch("https://www.anapioficeandfire.com/api/books");
  let out = await bookapi;
  let prom = out.json();
  let output = await prom;
  let parent = document.querySelector('.continar')

  for (let i in output) {
    let card_data = document.createElement('div');
    card_data.classList.add('card-data');
    card_data.setAttribute('id', `d-${i}`)
    card_data.style.display = "none"
    card_data.style.backgroundColor = "rgb(144, 156, 156)";
    let header = document.createElement('div');
    header.classList.add('header')
    header.innerHTML = `
    
    <p class="book-title" style="text-align:center;font-size:30px">BOOK NAME:<span style="color:rgb(70, 238, 18)">${output[i].name}</span></p>
    `
    card_data.append(header)

    let release = (output[i].released).split('T');
    let body_data = document.createElement('div');
    body_data.classList.add('body-data');
    body_data.innerHTML = `
    <p class="book-isbn" style="text-align:center;font-size:30px">BOOK ISBN:<span style="color:rgb(70, 238, 18)">${output[i].isbn}</span></p>
    <p class="book-numberofpages" style="text-align:center;font-size:30px">NUMBER OF PAGES:<span style="color:rgb(70, 238, 18)">${output[i].numberOfPages}</span></p>
    <p class="book-author" style="text-align:center;font-size:30px">BOOK AUTHORS:<span style="color:rgb(70, 238, 18)">${output[i].authors[0]}</span></p>
    <p class="book-publisher-name" style="text-align:center;font-size:30px">BOOK PUBLISHER:<span style="color:rgb(70, 238, 18)">${output[i].publisher}</span></p>
    <p class="release-date" style="text-align:center;font-size:30px">BOOK RELASED DATE:<span style="color:rgb(70, 238, 18)">${release[0]}</span></p>
    `
    card_data.append(body_data);

    parent.append(card_data);

    for (let j = 20; j < 25; j++) {
      char(output[i].characters[j])
    }
    let line = [];
    let count = 0;
    async function char(url) {

      try {
        let characters_name = fetch(url);
        let out1 = await characters_name;
        let prom1 = out1.json();
        let output1 = await prom1;

        line.push(output1.name)
        count++;
        if (count == 5) {
          let charName = document.createElement('div');
          charName.classList.add('char-names')
          charName.innerHTML = `
            <p class="char-names" style="text-align:center;padding:10px;font-size:30px;">CHAEACTERS:<span style="color:rgb(70, 238, 18)">${line}</span></p>
            `
          card_data.append(charName);
          line = '';
        }

      } catch (error) {
        alart(error);
      }

    }


  }

  let pagen = document.createElement('div');
  pagen.classList.add('page');
  pagen.innerHTML = "<span style='color:white;font-size:30px;text-align:center' >BOOK NO:</span>"
  parent.append(pagen)
  for (let k = 1; k < output.length + 1; k++) {
    let nation = document.querySelector('.page')
    let n1 = document.createElement('span');
    n1.setAttribute('style', 'margin:10px');
    n1.innerHTML = `
  <a href="#${k}" style="color:white;font-size:20px;border:2px solid red" onclick="page(this)"  >${k}</a>
  `
    pagen.append(n1);
  }
  let autoselect = document.querySelector('#d-0').style.display = "block";
  autoselect.setAttribute('target', '_blank');

}
book()
let a = 11;

function page(e) {
  console.log(e.innerText);
  console.log("key");

  document.querySelector(`#d-${e.innerText - 1}`).style.display = "block";

  if (a == 11) {

  }
  else if (((e.innerText - 1) == a)) {
    document.querySelector(`#d-${e.innerText - 1}`).style.display = "block";
  }
  else {
    document.querySelector(`#d-${a}`).style.display = "none";
  }
  a = e.innerText - 1;
}




