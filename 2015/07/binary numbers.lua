For example:

123 -> x means that the signal 123 is provided to wire x.
x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.

x = 123
z = x + y
q = p * 2
f = -e


871674 
8 * 100,000
7 * 10,000
1 * 1,000
6 * 100
7 * 10
4 * 1
               8421 
0000 0110 1000 1010



0 * 32768 = 0
0 * 16384 = 0
0 * 8192 = 0
0 * 4096 = 0

0 * 2048 = 0
1 * 1024 = 1024
1 * 512 = 512
0 * 256 = 0

1 * 128 = 128
0 * 64 = 0
0 * 32 = 0
0 * 16 = 0

1 * 8 = 8
0 * 4 = 0
1 * 2 = 2
0 * 1 = 0


______

0000 1101 0001 0100

0 * 32768 = 0
0 * 16384 = 0
0 * 8192 = 0
0 * 4096 = 0

1 * 2048 = 2048
1 * 1024 = 1024
0 * 512 = 0
1 * 256 = 256

0 * 128 = 0
0 * 64 = 0
0 * 32 = 0
1 * 16 = 16

0 * 8 = 0
1 * 4 = 4
0 * 2 = 0
0 * 1 = 0

g = 209 OR 52


1101 0001 
0011 0100
1111 0101

1 * 128 
1 * 64 
1 * 32
1 * 16

0 * 8
1 * 4
0 * 2
1 * 1

g = 245