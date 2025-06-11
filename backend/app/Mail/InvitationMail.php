<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

// app/Mail/InvitationMail.php

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function build() {
        return $this->subject('Welcome to BatchBox')
                    ->view('emails.invitation')  // create resources/views/emails/invitation.blade.php
                    ->with(['user' => $this->user]);
    }
}

