# Input the number of wins, draws, and losses
X, Y, Z = map(int, input().split())

# Total points scored by your team
my_team_points = X * 1 + Y * 0.5 + Z * 0

# Total points scored by the opposing team (since there are 4 games in total)
opponent_games = 4 - (X + Y + Z)

# The maximum points the opposing team can get (if they win all remaining games)
opponent_max_points = opponent_games * 1

# Check if your team has more points than the maximum possible points the opponent can get
if my_team_points > opponent_max_points:
    print("YES")
else:
    print("NO")
