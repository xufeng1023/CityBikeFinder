<?php

namespace App\SessionControl;

class SessionControl
{
	public function UpdateSession($session_id)
	{
		$this->removeOldSessionId($session_id);
		$this->storeNewSessionId();
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