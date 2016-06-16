<?php

namespace App\Http\Controllers;

use App\SessionControl\SessionControl;

class HomeController extends Controller
{

    protected $sessionControl;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(SessionControl $sessionControl)
    {
        $this->middleware('auth');
        $this->sessionControl = $sessionControl;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  
        $this->sessionControl->UpdateSession(\Auth::user()->session_id);
        return view('home');
    }
}