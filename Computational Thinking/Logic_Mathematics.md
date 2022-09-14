## 1. logical operation
### 1-1. Types
* NOT
    * ¬
    * ~
* AND
    * ∧
    * &
* OR
    * ∨
    * ||
* XOR
    * ⊕
* Conditional Proposition
    * ->
        |p|q|p -> q|
        |---|---|---|
        |T|T|T|
        |T|F|F|
        |F|T|T|
        |F|F|T|
    * Examples
        * If 0 is an odd number, I'm a monkey banana monster: T
        * IF 156156619 is Prime number, 2 is an even number: T
        * IF p and q are propoistions, and p->q is False: P == T, Q == F
        * p ∧ (q -> ¬p)
            |p|q|¬p| q -> ¬p | p ∧ (q -> ¬p) |
            |---|---|---|---|---|
            |T|T|F|F|F|
            |T|F|F|T|T|
            |F|T|T|T|F|
            |F|F|T|T|F|
* Biconditional Proposition
    * <->
        |p|q|p <-> q|
        |---|---|---|
        |T|T|T|
        |T|F|F|
        |F|T|F|
        |F|F|T|
### 1-2. Priority
* NOT
* AND
* OR
* Proposition
### 1-3. Converse(역), Inverse(이), Contraposition(대우)
* p -> q
    * Converse: q -> p
    * Inverse: ¬p -> ¬q
    * Contraposition: ¬q -> ¬p
        |p|q|p -> q| q -> p | ¬p -> ¬q | ¬q -> ¬p |
        |---|---|---|---|---|---|
        |T|T|T|T|T|T|
        |T|F|F|T|T|F|
        |F|T|T|F|F|T|
        |F|F|T|T|T|T|
    * Example
        * If 0 is an odd number, I'm a monkey banana monster: T
            * If I'm a monkey banana monster, 0 is an odd number: T
            * If 0 isn't an odd number, I'm not a monkey banana monster: T
            * If I'm not a monkey banana monster, 0 is an even number: T

## 2. Proof
* Applying propositions
    * ∀x, P(x) -> Q(x), Q(x) is true
        * ∀x ∈ R, if x < -1, x**2 + 1/4 > 0
    * ∀x, P(x) -> Q(x), P(x) is false
        * ∀x ∈ R, if 2x**2 - 4x + 4 < 0, x > 8
* Counter Example
    * ∀x ∈ R, x**2 >= x
        * F: x = 1/2
    * ∃x ∈ R, x**2 < x
        * T: x = 1/2
* Split the cases
    * ∀x ∈ Z, x**2 >= x
        * Z = 0
        * Z >= 1
        * Z <= -1
* Direct proof
    * When m is even, and n is odd, proof 2m + 3n is odd
        * k, l ∈ Z
        * m = 2k
        * n = 2l +1  
        * 2m + 3n = 2(2k + 3l + 1) + 1
* Contraposition proof
    * If n**2 is even, n is even
        * if n is odd, n**2 is odd
        * k ∈ Z
        * n = 2k + 1
        * n**2 = 2(2k\**2 + 2k) + 1

## 3. Expression of number
* n = 2**x
* x = log n
    * how many bytes are needed to express n
### 3-1. examples
* the range of numbers can be expressed by (log n) bits
    * 2 ** (log n)
    * n ** (log 2)
    * n
* which one is bigger? n is large enough
    * 2n ( ) n**2
        * 2 * n ( ) n * n
        * <
    * 2**(n\*log n) ( ) n!
        * 2**(log (n\*\*n)) ( ) n!
        * (n\*\*n)**(log 2) ( ) n!
        * n**n ( ) n!
        * n * n * n * n... ( ) n * (n-1) * (n-2)...
        * \>

## 4. Sets and Combinatorics(조합론)
* nCk = n!/(n-k)!/k!
    *  the number of combinations of n things taken k at a time without repetition
* nPk = n!/(n-k)!
    * the number of possible arrangements in a set when the order of the arrangements matters
