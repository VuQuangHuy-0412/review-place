<?php


namespace App\Commons;


class Utility
{
    public static function displayDatetime($time, $format = 'H:i d/m/Y')
    {
        if ($time == '00:00:00 0000:00:00'
            || $time == '0000:00:00 00:00:00'
            || $time == '0000-00-00 00:00:00'
            || $time == ''
            || $time == null
            || $time == 'null'
        ) {
            return '';
        }
        if (is_numeric($time)) {
            $date = new \DateTime();
            $d = self::secs2date($time, $date);
            return $d->format($format);
            // return date($format, intval($time));
        }

        return date($format, strtotime($time));
    }
}
