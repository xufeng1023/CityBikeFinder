<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  
        $this->removeOldSessionId(\Auth::user()->session_id);

        $this->storeNewSessionId();

        return view('home');
    }

    protected function removeOldSessionId($session_id)
    {
        if($session_id && (\Session::getHandler()->read($session_id))) {
            \Session::getHandler()->destroy($session_id);
        }
    }

    protected function storeNewSessionId()
    {
        \Auth::user()->session_id = \Session::getId();
        \Auth::user()->save();
    }
}
