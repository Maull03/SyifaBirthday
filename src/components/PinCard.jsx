import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ANNIVERSARY_DATE } from '../config';

export default function PinCard({ onSuccess, isSuccess = false }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isError, setIsError] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const normalizeAndSplitDate = (value) => {
    const clean = value.replace(/[\s\/\-]/g, '');
    if (clean.length === 8 && /^\d{8}$/.test(clean)) {
      return {
        day: clean.slice(0, 2),
        month: clean.slice(2, 4),
        year: clean.slice(4, 8)
      };
    }
    return null;
  };

  const handleDayChange = (e) => {
    const val = e.target.value;
    const parsed = normalizeAndSplitDate(val);
    if (parsed) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
      yearRef.current?.focus();
      return;
    }

    const cleaned = val.replace(/\D/g, '').slice(0, 2);
    setDay(cleaned);
    if (cleaned.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    const parsed = normalizeAndSplitDate(val);
    if (parsed) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
      yearRef.current?.focus();
      return;
    }

    if ((val === '/' || val === '-' || val === ' ') && month.length > 0) {
      yearRef.current?.focus();
      return;
    }

    const cleaned = val.replace(/\D/g, '').slice(0, 2);
    setMonth(cleaned);
    if (cleaned.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e) => {
    const val = e.target.value;
    const parsed = normalizeAndSplitDate(val);
    if (parsed) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
      return;
    }

    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    setYear(cleaned);
  };

  const handleMonthKeyDown = (e) => {
    if (e.key === 'Backspace' && !month) {
      dayRef.current?.focus();
    }
  };

  const handleYearKeyDown = (e) => {
    if (e.key === 'Backspace' && !year) {
      monthRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredDate = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
    
    const cleanEntered = enteredDate.replace(/[\s\/\-]/g, '');
    const cleanTarget = ANNIVERSARY_DATE.replace(/[\s\/\-]/g, '');

    if (cleanEntered === cleanTarget) {
      setError('');
      setIsError(false);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setError("That's not quite it... try again ♡");
      setIsShaking(true);
      setIsError(true);
      
      setDay('');
      setMonth('');
      setYear('');
      dayRef.current?.focus();

      setTimeout(() => {
        setIsShaking(false);
        setIsError(false);
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={isSuccess 
        ? { scale: 1.02, y: -5, opacity: 0.7 } 
        : { opacity: 1, y: 0, scale: 1 }
      }
      transition={isSuccess 
        ? { duration: 1.0, ease: "easeInOut" }
        : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
      }
      className={`keepsake-card-container ${isShaking ? 'shake' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        padding: '8px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: 'var(--card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          padding: '2.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '8px',
            border: '1px solid rgba(217, 147, 139, 0.15)',
            borderRadius: '10px',
            pointerEvents: 'none',
          }}
        />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: isSuccess ? 0.3 : 1.0, transition: 'opacity 0.8s ease' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-pink-light)',
              color: 'var(--accent-pink)',
              marginBottom: '1.5rem',
              boxShadow: isSuccess ? '0 0 16px rgba(217, 147, 139, 0.5)' : 'none',
              transform: isSuccess ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.8s ease',
            }}
          >
            <Heart 
              size={20} 
              strokeWidth={1.5}
              style={{
                animation: 'float-particle 4s ease-in-out infinite',
              }} 
            />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
              textAlign: 'center',
              letterSpacing: '-0.3px',
            }}
          >
            Do you remember?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
            }}
          >
            Our special date
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '2rem',
            }}
          >
            <input
              ref={dayRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="DD"
              value={day}
              onChange={handleDayChange}
              disabled={isSuccess}
              style={{
                width: '54px',
                height: '48px',
                textAlign: 'center',
                fontSize: '1.1rem',
                border: 'none',
                borderBottom: isError ? '1.5px solid var(--error-color)' : '1.5px solid var(--border-color)',
                backgroundColor: 'transparent',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                transition: 'border-color 0.3s ease, border-bottom-color 0.3s ease',
              }}
              onFocus={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--accent-pink)';
              }}
              onBlur={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--border-color)';
              }}
            />

            <span style={{ color: 'var(--border-color)', fontSize: '1.1rem', userSelect: 'none' }}>/</span>

            <input
              ref={monthRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="MM"
              value={month}
              onChange={handleMonthChange}
              onKeyDown={handleMonthKeyDown}
              disabled={isSuccess}
              style={{
                width: '54px',
                height: '48px',
                textAlign: 'center',
                fontSize: '1.1rem',
                border: 'none',
                borderBottom: isError ? '1.5px solid var(--error-color)' : '1.5px solid var(--border-color)',
                backgroundColor: 'transparent',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                transition: 'border-color 0.3s ease, border-bottom-color 0.3s ease',
              }}
              onFocus={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--accent-pink)';
              }}
              onBlur={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--border-color)';
              }}
            />

            <span style={{ color: 'var(--border-color)', fontSize: '1.1rem', userSelect: 'none' }}>/</span>

            <input
              ref={yearRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="YYYY"
              value={year}
              onChange={handleYearChange}
              onKeyDown={handleYearKeyDown}
              disabled={isSuccess}
              style={{
                width: '74px',
                height: '48px',
                textAlign: 'center',
                fontSize: '1.1rem',
                border: 'none',
                borderBottom: isError ? '1.5px solid var(--error-color)' : '1.5px solid var(--border-color)',
                backgroundColor: 'transparent',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                transition: 'border-color 0.3s ease, border-bottom-color 0.3s ease',
              }}
              onFocus={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--accent-pink)';
              }}
              onBlur={(e) => {
                if (!isError) e.target.style.borderBottomColor = 'var(--border-color)';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSuccess}
            style={{
              width: '100%',
              maxWidth: '180px',
              height: '44px',
              borderRadius: '22px',
              border: 'none',
              backgroundColor: 'var(--accent-pink)',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              cursor: isSuccess ? 'default' : 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 4px 12px rgba(217, 147, 139, 0.15)',
            }}
            onMouseEnter={(e) => {
              if (isSuccess) return;
              e.currentTarget.style.backgroundColor = 'var(--accent-pink-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(217, 147, 139, 0.25)';
            }}
            onMouseLeave={(e) => {
              if (isSuccess) return;
              e.currentTarget.style.backgroundColor = 'var(--accent-pink)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 147, 139, 0.15)';
            }}
            onMouseDown={(e) => {
              if (isSuccess) return;
              e.currentTarget.style.transform = 'translateY(1px)';
            }}
            onMouseUp={(e) => {
              if (isSuccess) return;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
          >
            {isSuccess ? 'Unlocking...' : 'Enter'}
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--error-color)',
                marginTop: '1.25rem',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              {error}
            </motion.p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
