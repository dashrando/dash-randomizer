// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Class: DotNetRandom
**
** Purpose: A random number generator.
**
** Note: This is a javascript implementation of the Random
**       class provided in the .NET Framework.
** 
===========================================================*/

class DotNetRandom {
   MBIG = 2147483647;
   MSEED = 161803398;

   inext;
   inextp;
   SeedArray = new Array(56);

   constructor(Seed) {
      const Int32MinValue = -2147483648;
      const Int32MaxValue = 2147483647;

      // Initialize our Seed array.
      // This algorithm comes from Numerical Recipes in C (2nd Ed.)
      let subtraction = Seed == Int32MinValue ? Int32MaxValue : Math.abs(Seed);
      let mj = this.MSEED - subtraction;
      this.SeedArray[55] = mj;
      let mk = 1;
      let ii;
      for (let i = 1; i < 55; i++) {
         // Apparently the range [1..55] is special (Knuth) and so we're wasting the 0'th position.
         ii = (21 * i) % 55;
         this.SeedArray[ii] = mk;
         mk = mj - mk;
         if (mk < 0) mk += this.MBIG;
         mj = this.SeedArray[ii];
      }
      for (let k = 1; k < 5; k++) {
         for (let i = 1; i < 56; i++) {
            this.SeedArray[i] -= this.SeedArray[1 + ((i + 30) % 55)];
            if (this.SeedArray[i] < 0) this.SeedArray[i] += this.MBIG;
         }
      }
      this.inext = 0;
      this.inextp = 21;
      Seed = 1;
   }

   /*====================================Sample====================================
      **Action: Return a new random number [0..1) and reSeed the Seed array.
      **Returns: A double [0..1)
      **Arguments: None
      **Exceptions: None
      ==============================================================================*/
   Sample() {
      //Including this division at the end gives us significantly improved
      //random number distribution.
      return this.InternalSample() * (1.0 / this.MBIG);
   }

   InternalSample() {
      let locINext = this.inext;
      let locINextp = this.inextp;

      if (++locINext >= 56) locINext = 1;
      if (++locINextp >= 56) locINextp = 1;

      let retVal = this.SeedArray[locINext] - this.SeedArray[locINextp];

      if (retVal == this.MBIG) retVal--;
      if (retVal < 0) retVal += this.MBIG;

      this.SeedArray[locINext] = retVal;

      this.inext = locINext;
      this.inextp = locINextp;

      return retVal;
   }

   /*=====================================Next=====================================
      **Returns: An int [0..Int32.MaxValue)
      **Arguments: None
      **Exceptions: None.
      ==============================================================================*/
   Next() {
      return this.InternalSample();
   }

   GetSampleForLargeRange() {
      // The distribution of double value returned by Sample
      // is not distributed well enough for a large range.
      // If we use Sample for a range [Int32.MinValue..Int32.MaxValue)
      // We will end up getting even numbers only.

      let result = this.InternalSample();
      // Note we can't use addition here. The distribution will be bad if we do that.
      let negative = this.InternalSample() % 2 == 0 ? true : false; // decide the sign based on second sample
      if (negative) {
         result = -result;
      }
      let d = result;
      d += this.MBIG - 1; // get a number in range [0 .. 2 * Int32MaxValue - 1)
      d /= 2 * this.MBIG - 1;
      if (d < 0) {
         console.log("negative");
      }
      return d;
   }

   /*=====================================Next=====================================
      **Returns: An int [minvalue..maxvalue)
      **Arguments: minValue -- the least legal value for the Random number.
      **           maxValue -- One greater than the greatest legal return value.
      **Exceptions: None.
      ==============================================================================*/
   NextInRange(minValue, maxValue) {
      const methodName = "DotNetRandom::Next(minValue,maxValue)";
      if (minValue > maxValue) {
         console.log(methodName + " = min greater than max");
      }
      if (!Number.isInteger(minValue)) {
         console.log(methodName + " = min is non-integer");
      }
      if (!Number.isInteger(maxValue)) {
         console.log(methodName + " = max is non-integer");
      }

      const range = maxValue - minValue;
      if (range <= this.MBIG) {
         return Math.floor(this.Sample() * range) + minValue;
      } else {
         return Math.floor(this.GetSampleForLargeRange() * range) + minValue;
      }
   }

   /*=====================================Next=====================================
      **Returns: An int [0..maxValue)
      **Arguments: maxValue -- One more than the greatest legal return value.
      **Exceptions: None.
      ==============================================================================*/
   Next(maxValue) {
      const methodName = "DotNetRandom::Next()";
      if (maxValue < 0) {
         console.log(methodName + " = max is less than zero");
      }
      if (!Number.isInteger(maxValue)) {
         console.log(methodName + " = max is non-integer");
      }

      return Math.floor(this.Sample() * maxValue);
   }

   /*=====================================Next=====================================
      **Returns: A double [0..1)
      **Arguments: None
      **Exceptions: None
      ==============================================================================*/
   NextDouble() {
      return Sample();
   }

   /*==================================NextBytes===================================
      **Action:  Fills the byte array with random bytes [0..0x7f].  The entire array is filled.
      **Returns:Void
      **Arugments:  buffer -- the array to be filled.
      **Exceptions: None
      ==============================================================================*/
   /*NextBytes (buffer)
      {
         if (buffer == null) throw new ArgumentNullException ("buffer");
         Contract.EndContractBlock ();
         for (let i = 0; i < buffer.Length; i++)
         {
            buffer[i] = (byte)(InternalSample () % (0xff + 1));
         }
      }*/
}

export default DotNetRandom;
