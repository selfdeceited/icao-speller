<div class="container mx-auto items-center my-12 md:my-24 flex-grow">

    <div class="
     w-full lg:w-full
     justify-center items-start
     pt-12 pb-24 px-6">
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

    <div class="w-fulltext-center
     w-3/4">
      <input 
        class="bg-white
         focus:outline-none
         focus:shadow-outline
         border border-gray-300
         rounded-lg py-2 px-4 block
         w-full appearance-none
         leading-normal"
        placeholder="Please start typing!" 
        on:input={storeValue} >
    </div>
</div>

<script>
import { values } from './stores.js';
function storeValue(event) {
    values.set(event.target.value);
}
</script>