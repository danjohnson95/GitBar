<link rel="stylesheet" href="{{ asset('/vendor/danj/gitbar/css/gitbar.css') }}" type="text/css">
<div id="gitbar">
	

	<div class="gitbar-current">
		Current Branch <strong>{{$CurrentBranch}}</strong>
	</div>

	<div class="gitbar-branches">
		Switch branch
		<select>
			@foreach($Branches as $Branch)
				<option {{$Branch['Current'] ? "selected" : ""}}>{{$Branch['Name']}}</option>
			@endforeach
		</select>

		<button id="checkout-branch">
			<div class="load"></div>
		</button>
	</div>

</div>