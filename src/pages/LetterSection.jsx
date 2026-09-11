import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Letter content (easy to replace) ──────────────────────────────────── */
const LETTERS = [
  {
    id: 'birthday',
    rotation: '-2deg',
    icon: '✉',
    accent: 'var(--accent-pink)',
    eyebrow: 'FOR YOUR',
    title: 'Birthday',
    subtitle: 'a little letter for you ♡',
    greeting: 'To you, who today becomes one year older and one year wiser.',
    /* ↓ Replace everything inside the backticks with your birthday message */
    body: `Happy birthday, my love. ♡

Today might look like an ordinary day to the rest of the world.
The sun still rises, time keeps moving,
and everyone continues living their own lives.

But to me,
today has always carried a little more meaning.

Because on this day,
someone who means so much to me was born.

Someone who, years later,
somehow found her way into my life
and became part of my journey.

And for that,
I want to thank life
for bringing us together.

I don't know what the world was like before you were in it.
But I know that since you came into mine,
some parts of my life have felt a little more colorful.

There are laughs that became more meaningful.
Bad days that somehow felt a little lighter.
Little stories that finally had someone to be told to.

And there is someone I can now call home,
even when we're not always in the same place.

On your birthday,
I don't only want to wish you happiness.

Because I know
life will not always give you easy days.

There will be days when everything goes exactly the way you hoped.
But there will also be days when you feel left behind,
tired,
disappointed,
or even wonder
whether everything you're fighting for will ever lead you where you want to go.

And when those days come,
I hope you remember one thing:

You don't always have to be strong.

You are allowed to be tired.
You are allowed to pause for a while.
You are allowed to cry when the world feels too heavy.

It's okay if, someday,
your steps become a little slower.

Because I don't think growing is about
how quickly someone reaches the finish line.

I think it's about choosing to keep walking,
even when the road isn't easy.

So, in this new chapter of your life,
I hope you find more reasons to smile.

I hope the things you've been working so hard for
slowly find their way to you.

I hope the dreams you quietly keep in your heart
one by one become real.

I hope you're surrounded by people who are genuine,
that life keeps bringing you beautiful things,
and that you're always given the courage
to choose the things that truly make you happy.

And if someday
you look back
and realize how far you've come,

I hope you smile.

Not because everything was ever perfect,
but because you made it through
so many things you once thought
you wouldn't be able to overcome.

And if life ever takes us
to places we never imagined,
I want to still be someone
who gets to walk beside you.

To be there when your steps feel light,
and to hold your hand
when they become heavy.

I can't promise
that I'll always have the answers to every problem you face.

But I can promise you one thing:

as long as I'm given the chance,
I want to be there.

To watch you grow.
To watch you chase your dreams.
To watch you fall and find your way back up.
To witness all the versions of you
that you haven't even met yet.

Because to me,
loving someone isn't only about loving
who they are today.

It's also about loving
who they're becoming.

So,
happy birthday, my love.

I hope this year is gentler with you.

May your steps be filled with courage,
your heart with peace,
and your life with the kind of moments
that are worth smiling for.

And if someday
you forget how precious you are,
I hope this little letter reminds you:

there is someone in this world
who is incredibly grateful that you were born.

Someone who is grateful to have known you.

Someone who is grateful to have walked beside you.

And someone who,
even today,
still chooses to love you.

Happy birthday, my love.

Thank you for being born.

Thank you for being you.

And thank you,
because among all the possibilities in this enormous world,
somehow,
we found each other.

May this not only be another year added to your age,
but a year filled with more reasons
to love the life you're living.

Happy birthday.

To you,
today,
tomorrow,
and every day that is still waiting for us.`,
    closing: 'With all my love, always.',
    signature: '♡',
    tapeRotate: '-18deg',
    floral: '🌸',
  },
  {
    id: 'thankyou',
    rotation: '+2deg',
    icon: '♡',
    accent: '#b8927c',
    eyebrow: 'A LETTER OF',
    title: 'Thank You',
    subtitle: 'for being there since day one',
    greeting: 'To the one who stayed,',
    /* ↓ Replace everything inside the backticks with your thank-you message */
    body: `If I ever become someone I once dreamed of being,
I hope you know that a part of that journey has your name written somewhere in it.

Thank you for staying with me when I had almost nothing to offer.
When my dreams were still only dreams,
when my steps were uncertain,
and when I was still trying to figure out what kind of person I wanted to become.

You were there when I was still at the beginning of everything.

And somehow, little by little, life started moving.

Work became smoother.
Opportunities began to find their way to me.
I received a scholarship I once only wished for.
I made it through a national program.
There were achievements I never thought I would be able to put my name on.

And whenever I look back at all of it,
I don't just see the things I've accomplished.

I see the road behind me.

A road that wasn't always beautiful.

There were storms we had to walk through.
Days when everything felt heavier than it should.
Moments when I questioned myself, my choices, and where all of this was going.

But somehow, through all those seasons,
you were still there.

Not always with the perfect words.
Not always knowing how to make everything better.

Sometimes, you were simply there.

And maybe that's what meant the most.

You stayed while I was still becoming.

Before the achievements.
Before the progress.
Before I had anything that could make me feel proud of myself.

You stayed for the version of me that was still trying,
still failing,
still learning,
still carrying dreams that hadn't found their way into reality yet.

I used to think I was just a tiny speck of dust trying to find its place in this enormous world.

But you never made me feel too small to dream.

You walked beside me while I was trying to turn those little dreams into something real.

And for that,
I will always be grateful.

Maybe one day I'll achieve things much greater than everything I have today.
Maybe there will be bigger dreams, bigger places, and bigger chapters waiting for us.

But wherever life takes me,
I hope I never forget the beginning.

The days when we had almost nothing.
The nights when all we had were hopes.
The little victories that felt enormous.
And the person who chose to stay through all of them.

Thank you for walking with me from zero.

Thank you for believing in me when I was still learning how to believe in myself.

And thank you for being there—not only for the person I am today,
but for the person I was when I had nothing but a dream.

If the life I'm building is a story,
then you were never just someone who watched it happen.

You were there in the chapters that made me who I am.

And if I ever get lost somewhere along the way,
I hope I remember this:

I didn't walk all this way alone.`,
    closing: 'With all my gratitude,\nalways.',
    signature: '♡',
    tapeRotate: '15deg',
    floral: '🌿',
  },
];

/* ─── Decorative tape strip ─────────────────────────────────────────────── */
function Tape({ rotate, color = 'rgba(217,147,139,0.20)' }) {
  return (
    <div style={{
      position: 'absolute',
      top: '-8px',
      left: '50%',
      transform: `translateX(-50%) rotate(${rotate})`,
      width: '48px',
      height: '14px',
      backgroundColor: color,
      border: '1px dashed rgba(217,147,139,0.35)',
      borderRadius: '1px',
      zIndex: 2,
      pointerEvents: 'none',
    }} />
  );
}

/* ─── Closed envelope card ──────────────────────────────────────────────── */
function EnvelopeCard({ letter, onOpen, isDimmed }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        opacity: isDimmed ? 0.38 : 1,
        filter: isDimmed ? 'blur(1.5px)' : 'blur(0px)',
        scale: isDimmed ? 0.97 : hovered ? 1.03 : 1,
        y: hovered && !isDimmed ? -4 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: 'relative',
        width: '148px',
        flexShrink: 0,
        cursor: isDimmed ? 'default' : 'pointer',
        transform: `rotate(${letter.rotation})`,
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
    >
      {/* Tape */}
      <Tape rotate={letter.tapeRotate} />

      {/* Card body */}
      <div style={{
        backgroundColor: '#fbf9f5',
        border: '1px solid var(--border-color)',
        borderRadius: '3px',
        padding: '20px 14px 18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 3px 12px rgba(138,124,119,0.12), 0 1px 3px rgba(138,124,119,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Subtle dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(217,147,139,0.06) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }} />

        {/* Envelope flap line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '40px', pointerEvents: 'none', overflow: 'hidden',
        }}>
          <div style={{
            width: 0, height: 0,
            borderLeft: '74px solid transparent',
            borderRight: '74px solid transparent',
            borderTop: '36px solid rgba(188,170,160,0.13)',
            position: 'absolute', top: 0, left: 0,
          }} />
        </div>

        {/* Icon */}
        <span style={{
          fontSize: '1.6rem',
          color: letter.accent,
          marginTop: '20px',
          position: 'relative',
          zIndex: 1,
        }}>
          {letter.icon}
        </span>

        {/* Floral */}
        <span style={{ fontSize: '0.75rem', opacity: 0.55, position: 'relative', zIndex: 1 }}>
          {letter.floral}
        </span>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.55rem',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          margin: '6px 0 0',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
        }}>
          {letter.eyebrow}
        </p>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          margin: '0 0 2px',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          {letter.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.62rem',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          lineHeight: 1.3,
          paddingBottom: '4px',
        }}>
          {letter.subtitle}
        </p>

        {/* Bottom rule */}
        <div style={{
          width: '28px', height: '1px',
          backgroundColor: 'var(--border-color)',
          marginTop: '4px',
        }} />

        {/* Tap hint */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.55rem',
          fontStyle: 'italic',
          color: letter.accent,
          opacity: 0.75,
        }}>
          tap to open
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Custom body renderer to style highlights and adjust text spacing ──── */
function renderLetterBody(letter) {
  const paragraphs = letter.body.split('\n\n');

  // Highlights for both letters
  const birthdayHighlights = [
    "You don't always have to be strong.",
    "as long as I'm given the chance,\nI want to be there.",
    "Because to me,\nloving someone isn't only about loving\nwho they are today.",
    "It's also about loving\nwho they're becoming.",
    "there is someone in this world\nwho is incredibly grateful that you were born.",
    "Thank you for being born.",
    "somehow,\nwe found each other."
  ];

  const thankyouHighlights = [
    "You stayed while I was still becoming.",
    "Thank you for walking with me from zero.",
    "You were there in the chapters that made me who I am.",
    "I didn't walk all this way alone."
  ];

  const highlights = letter.id === 'birthday' ? birthdayHighlights : thankyouHighlights;

  return paragraphs.map((text, index) => {
    const trimmed = text.trim();
    const isHighlighted = highlights.some(h => trimmed.includes(h.trim()));

    return (
      <p
        key={index}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isHighlighted ? '17.5px' : '16px',
          color: isHighlighted ? 'var(--text-primary)' : 'var(--text-secondary)',
          lineHeight: '1.82',
          marginBottom: '18px',
          whiteSpace: 'pre-line',
          fontStyle: isHighlighted ? 'italic' : 'normal',
          fontWeight: isHighlighted ? '600' : '400',
          position: 'relative',
          paddingLeft: isHighlighted ? '10px' : '0px',
          borderLeft: isHighlighted ? '2px solid rgba(217, 147, 139, 0.4)' : 'none',
        }}
      >
        {text}
      </p>
    );
  });
}

/* ─── Open letter paper ──────────────────────────────────────────────────── */
function OpenLetter({ letter, onClose }) {
  return (
    <motion.div
      key={letter.id}
      initial={{ opacity: 0, scale: 0.82, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '320px',
      }}
    >
      {/* Tape on open letter */}
      <Tape rotate={letter.tapeRotate} />

      {/* Paper sheet */}
      <div style={{
        backgroundColor: '#fdfaf6',
        border: '1px solid var(--border-color)',
        borderRadius: '3px',
        padding: '36px 28px 28px',
        boxShadow: '0 8px 32px rgba(138,124,119,0.16), 0 2px 8px rgba(138,124,119,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Paper texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(217,147,139,0.05) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }} />

        {/* Ruled lines (subtle) */}
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '28px', right: '28px',
            top: `${84 + i * 26}px`,
            height: '1px',
            backgroundColor: 'rgba(188,170,160,0.12)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '1.3rem', color: letter.accent }}>{letter.icon}</span>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.55rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            margin: '6px 0 2px',
          }}>
            {letter.eyebrow}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            {letter.id === 'birthday' ? 'A Letter For Your Birthday' : 
             letter.id === 'thankyou' ? 'A Letter of Thank You' : letter.title}
          </h2>
          <div style={{
            width: '36px', height: '1px',
            backgroundColor: 'var(--border-color)',
            margin: '10px auto 0',
          }} />
        </div>

        {/* Greeting */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          marginBottom: '14px',
          lineHeight: 1.5,
          position: 'relative', zIndex: 1,
        }}>
          {letter.greeting}
        </p>

        {/* Body */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderLetterBody(letter)}
        </div>

        {/* Closing */}
        <div style={{
          textAlign: 'right',
          position: 'relative', zIndex: 1,
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.82rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginBottom: '4px',
            whiteSpace: 'pre-line',
          }}>
            {letter.closing}
          </p>
          <span style={{ fontSize: '1.2rem', color: letter.accent }}>
            {letter.signature}
          </span>
        </div>

        {/* Close button */}
        <div style={{ textAlign: 'center', marginTop: '20px', position: 'relative', zIndex: 1 }}>
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.72rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '2px',
              letterSpacing: '0.3px',
            }}
          >
            close ♡
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main LetterSection page ───────────────────────────────────────────── */
export default function LetterSection() {
  const [openId, setOpenId] = useState(null); // null | 'birthday' | 'thankyou'

  const openLetter = LETTERS.find(l => l.id === openId) || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
      style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem 5rem',
        zIndex: 5,
        position: 'relative',
      }}
    >
      {/* ── Section intro ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.62rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: '0.6rem',
        }}>
          — just for you —
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.9rem, 5.5vw, 2.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.25,
          margin: '0 0 0.6rem',
        }}>
          Two little letters
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: 'var(--accent-pink)',
        }}>
          there are still a few things I want to tell you ♡
        </p>
      </motion.div>

      {/* ── Two closed envelopes OR open letter ── */}
      <AnimatePresence mode="wait">
        {!openId ? (
          /* ── CLOSED STATE: side-by-side cards ── */
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '16px',
              width: '100%',
            }}
          >
            {LETTERS.map(letter => (
              <EnvelopeCard
                key={letter.id}
                letter={letter}
                isDimmed={false}
                onOpen={() => setOpenId(letter.id)}
              />
            ))}
          </motion.div>
        ) : (
          /* ── OPEN STATE: single expanded letter ── */
          <OpenLetter
            key={openId}
            letter={openLetter}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Subtle footer floral ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          marginTop: '3rem',
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: 'var(--accent-pink)',
          letterSpacing: '6px',
        }}
      >
        🌸 · ♡ · 🌸
      </motion.p>
    </motion.div>
  );
}
