// Carico le voci per dare il tempo al browser di caricarle -> voiceschanged
let voices = [];
speechSynthesis.addEventListener('voiceschanged', function(){
    voices = speechSynthesis.getVoices();
})

// Primo step: prendere da html tutti gli elementi che ci servono in JS, quindi: contenuto TA, tasto play, barra del pitch e il tag figure
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');

// Osserviamo il tasto play per vedere se qualcuno lo clicca - se qualcuno clicca il bottone fa quello che ti dico
playButton.addEventListener('touchend' , function(){
    // Istruzioni in caso di click
    // Prima controllo se c'è effettivamente testo - devo anche controllare che non ci siano spazi prima e dopo - trim elimina gli spazi
    const textLength = textArea.value.trim().length;
    if(textLength > 0) {
        talk();
    }
});

// Funzione per far parlare la paperella
function talk() {
    // step 1 - prendere il testo della TA e il pitch
    const text = textArea.value;
    const pitch = pitchBar.value;

    // step 2 - Sintetizzatore vocale - per usarlo dobbiamo creare una frase con un determinato criterio
    const utterance = new SpeechSynthesisUtterance(text);

    // step 3 - specifichiamo altri dettagli della frase
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = pitch;

    // Voce femminile
    const femaleVoice = voices.find(function(voice){
        if(voice.name.includes('Elsa') || voice.name.includes('Alice')) {
            return true;
        }
    });

    utterance.voice = femaleVoice;

    // Facciamo parlare la paperella
    speechSynthesis.speak(utterance);
    // Su desktop parla al maschile, su mobile al femminile

    // Quando la paperella inizia a parlare
    utterance.addEventListener('start', function(){
        // Mentre la paperella parla devo bloccare tutti gli elementi che comandano l'app, altrimenti si potrebbero creare dei bug
        textArea.disabled = true;
        pitchBar.disabled = true;
        playButton.disabled = true;

        // animiamo la paperella
        duckFigure.classList.add('talking');
    });

    // Quando la paperella finisce di parlare
    utterance.addEventListener('end', function(){
        // Sblocco i comandi
        textArea.disabled = false;
        pitchBar.disabled = false;
        playButton.disabled = false;

        duckFigure.classList.remove('talking');
    });
}
