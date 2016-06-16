<?php

namespace App\Http\Controllers;

class CityBikeController extends Controller
{
    protected $feeds = '';

    public function __construct()
    {
        $this->middleware('auth');
        $this->feeds = file_get_contents('https://feeds.citibikenyc.com/stations/stations.json');
    }

    public function getStationFeeds()
    {
        return $this->feeds; 
    }

    public function getOneFeed($feed_id)
    {
        $feeds = json_decode($this->feeds);
        
        foreach($feeds->stationBeanList as $feed) {
            if($feed->id == $feed_id) {
                $date = date_create($feed->lastCommunicationTime);
                $feed->lastCommunicationTime = date_format($date, "g:i A");
                return json_encode($feed);
            }
        };
    }
}