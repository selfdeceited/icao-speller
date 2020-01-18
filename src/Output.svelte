<div class="bg-white h-full">
    <div class="container mx-auto pt-24 md:pt-16 px-6">
	    {@html icaoValues}
	</div>
</div>

<script>
import { values } from './stores.js';
import alphabet from './alphabet.json';

let icaoValues;

// TODO: refactor the method
const spell = input => {
    if (!input) return "";
    const lang = "value"; // TODO: proper language support
    
    var result = [];
    input.split('').map(symbol =>  {
        const selectedLetter = alphabet.filter(x => x.name == symbol.toUpperCase())[0];
        if (!selectedLetter) {
            switch (symbol) {
                case " ": selectedLetter = alphabet["space"]; break;
                case ".": selectedLetter = alphabet["decimal"]; break;
            }
        }
        
        if (selectedLetter) {
            const htmlTemplateToLoad = symbol === " "
                ? `<span>${selectedLetter[lang]}</span>`
                : `<span class="tooltip-container tooltip">${selectedLetter[lang]}</span>`;

            result.push(htmlTemplateToLoad);
        } else {
            result.push('<span class="symbol-not-found">' + symbol + '</span>');
        }
    });

    return result.join(' ');
};

const unsubscribe = values.subscribe(value => {
	icaoValues = spell(value);
});

</script>