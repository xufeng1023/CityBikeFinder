@extends('layouts.app')

@section('content')
<div id="mapDiv" style="height:100vh;"></div>
@endsection

@section('script')
<script src="https://maps.googleapis.com/maps/api/js"></script>
<script src="{{ asset('js/map.js') }}"></script>
@endsection
