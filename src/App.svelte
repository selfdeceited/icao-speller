<div class="bg-transparent">
  <Description/>
  <div class="bg-white h-full output-container">
    <Output/>
  </div>
</div>

<script>
  import Description from './Description.svelte';
  import Output from './Output.svelte';
</script>

<style>
.output-container {
  margin-top:2vh;
  margin-bottom:2vh;
  min-height:30vh;
}
</style>