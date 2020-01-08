<div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24 flex-grow">
		<!--Left Col-->
		<div class="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
			<h1 class="font-bold text-3xl my-4" >
        <i class="em em-airplane"></i>
        ICAO speller
        <i class="em em-small_airplane"></i>
       </h1>
			<p class="leading-normal mb-4">
        This page can help you to easily 'spell' links, addresses, names or any other text stuff in ICAO (NATO) phonetic alphabet, well-known all over the world.
      </p>
      <p class="leading-normal mb-4">
        If you see the symbol is <k class="symbol-not-found">highlighted</k>, it may be not added or even doesn't exist in the alphabet.
      </p>
		</div>
		<!--Right Col
     lg:w-1/2 lg:py-6 
    -->
		<div class="w-fulltext-center">
      <input 
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        placeholder="Please start typing!" 
        bind:value={values} >
		</div>
		
	  </div>
	
	
	<!--Container-->
	<div class="bg-white h-screen ">
		<div class="container mx-auto pt-24 md:pt-16 px-6">
			<article>{@html icaoValues}</article>
		</div>
		
    
	</div>

<script>
  import alphabet from './alphabet.json';
  let values = '';
  let icaoValues = '';

  const spell = input => {
    if (!input) return "";
    const lang = "value";
    
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
          ? '<span>' + selectedLetter[lang] + '</span>'
          : '<span class="tooltip-container tooltip" title="'+ symbol.toUpperCase()+'">' + selectedLetter[lang]  + '</span>';

        result.push(htmlTemplateToLoad);
      } else {
        result.push('<span class="symbol-not-found" style="background-color: yellow;">' + symbol + '</span>');
      }
    });

    return result.join(' ');
  };

  $: icaoValues = spell(values);
</script>

<!-- Include styles -->
<style>
  .symbol-not-found{
    background-color:yellow;
    position: relative;
    display: inline-block;
  }
</style>